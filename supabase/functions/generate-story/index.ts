import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChildProfile {
  name?: string;
  age?: number;
  ageRange?: string;
  preferredThemes?: string[];
  favoriteCharacters?: string[];
  sensitivities?: string[];
}

const formatChildProfile = (profile?: ChildProfile): string => {
  if (!profile) return 'Child preferences were not provided.';

  const parts: string[] = [];

  if (profile.name) parts.push(`Name: ${profile.name}`);
  if (profile.age) parts.push(`Age: ${profile.age}`);
  if (profile.ageRange) parts.push(`Age range: ${profile.ageRange}`);
  if (profile.preferredThemes?.length) parts.push(`Preferred themes: ${profile.preferredThemes.join(', ')}`);
  if (profile.favoriteCharacters?.length) parts.push(`Favorite characters: ${profile.favoriteCharacters.join(', ')}`);
  if (profile.sensitivities?.length) parts.push(`Sensitivities: ${profile.sensitivities.join(', ')}`);

  return parts.join('\n') || 'Create a calm, kind bedtime story for a young child.';
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not configured.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { storyStarter, childProfile, language } = await req.json();

    if (!storyStarter || typeof storyStarter !== 'string') {
      return new Response(
        JSON.stringify({ error: 'storyStarter is required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const promptLanguage = ['ar', 'fr', 'en'].includes(language) ? language : 'en';
    const profileContext = formatChildProfile(childProfile);

    const systemPrompt = `You are a gentle storyteller helping a parent with a bedtime routine.

Your task:
- Continue the story starting from the user's prompt.
- Use these child preferences when shaping the narrative:
${profileContext}

Guidelines:
- Keep the tone calm, soothing, and imaginative.
- Avoid anything frightening or overly energetic.
- Keep paragraphs short and easy to read aloud.
- Write 3-5 short paragraphs maximum.
- Respond ONLY in the language code provided: ${promptLanguage}.`;

    console.log('Generating story with starter:', storyStarter.substring(0, 50));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: storyStarter }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate story.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const story = data.choices?.[0]?.message?.content?.trim();

    if (!story) {
      console.error('No story content in response:', data);
      return new Response(
        JSON.stringify({ error: 'No story was generated.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Story generated successfully');
    return new Response(
      JSON.stringify({ story }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-story function:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error while generating story.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
