import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'

import {createClient} from '@supabase/supabase-js'

const supabase = createClient(
  'https://gbiwyeipcezllbscycef.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiaXd5ZWlwY2V6bGxic2N5Y2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0OTgwNDAsImV4cCI6MTk4MzA3NDA0MH0.EVttMx1ecipZMeoq591NNv2C3VweWQXJtyTaiIi4Qlg'
)

const Login = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
  />
)

export default Login