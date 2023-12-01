import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://osaoeebokyudngypsfhq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYW9lZWJva3l1ZG5neXBzZmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQzNDQ1OCwiZXhwIjoyMDA5MDEwNDU4fQ.qcPUcmuyUWZduQwHSwb3qZC7YtYaYMbvwvzcfcOirgg"
  );

export default supabase;