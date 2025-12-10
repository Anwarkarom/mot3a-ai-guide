const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const formatChildProfile = profile => {
  if (!profile) return 'Child preferences were not provided.';

  const parts = [];

  if (profile.name) parts.push(`Name: ${profile.name}`);
  if (profile.age) parts.push(`Age: ${profile.age}`);
  if (profile.ageRange) parts.push(`Age range: ${profile.ageRange}`);
  if (profile.preferredThemes?.length) parts.push(`Preferred themes: ${profile.preferredThemes.join(', ')}`);
  if (profile.favoriteCharacters?.length) parts.push(`Favorite characters: ${profile.favoriteCharacters.join(', ')}`);
  if (profile.sensitivities?.length) parts.push(`Sensitivities: ${profile.sensitivities.join(', ')}`);

  return parts.join('\n') || 'Create a calm, kind bedtime story for a young child.';
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'Gemini API key is not configured.' });
    return;
  }

  const { storyStarter, childProfile, language } = req.body || {};

  if (!storyStarter || typeof storyStarter !== 'string') {
    res.status(400).json({ error: 'storyStarter is required.' });
    return;
  }

  const promptLanguage = ['ar', 'fr', 'en'].includes(language) ? language : 'en';
  const profileContext = formatChildProfile(childProfile);

  const prompt = `You are a gentle storyteller helping a parent with a bedtime routine.\n\n` +
    `- Continue the story starting from: "${storyStarter}".\n` +
    `- Use these child preferences when shaping the narrative:\n${profileContext}\n` +
    `- Keep the tone calm, soothing, and imaginative.\n` +
    `- Avoid anything frightening or overly energetic.\n` +
    `- Keep paragraphs short and easy to read aloud.\n` +
    `- Respond only in the language code provided: ${promptLanguage}.`;

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(500).json({ error: 'Failed to generate story', details: errorText });
      return;
    }

    const data = await response.json();
    const story = data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text)
      .join('\n')
      .trim();

    if (!story) {
      res.status(500).json({ error: 'No story was generated.' });
      return;
    }

    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error while contacting Gemini API.', details: String(error) });
  }
}
