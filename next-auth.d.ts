import { User } from "next-auth" // imported from next-auth to extend the User type
import { JWT } from "next-auth/jwt" // imported from next-auth/jwt to extend the JWT type
 
type UserId = string; // type for the user id

// extend the User type to include the id and the JWT type to include the id
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}
// extend the Session type to include the user property( id )
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}