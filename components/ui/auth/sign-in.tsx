
import { signIn } from "@/auth"
import { Button } from "../button"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button>Sign in with google</Button>
    </form>
  )
} 