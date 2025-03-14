<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { encrypt, decrypt } from '$lib/encryption';

  let content = "Test content";
  const noteId = "test-note-1";

  async function saveNote() {
    const encrypted = encrypt(content);
    const { error } = await supabase
      .from('pages')
      .upsert({ id: noteId, content: encrypted });
    if (!error) alert('Saved!');
  }

  async function loadNote() {
    const { data } = await supabase
      .from('pages')
      .select('content')
      .eq('id', noteId)
      .single();
    if (data?.content) content = decrypt(data.content);
  }
</script>

<textarea bind:value={content} class="w-full h-40 p-2 border"></textarea>
<button on:click={saveNote} class="bg-blue-500 text-white p-2 mr-2">Save</button>
<button on:click={loadNote} class="bg-green-500 text-white p-2">Load</button>
