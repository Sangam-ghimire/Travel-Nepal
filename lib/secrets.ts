// Desc: This file contains functions to get secrets from the environment.
export const getAuthSecret = (): string => {
    const secret = process.env.NEXTAUTH_SECRET

    if (!secret || secret.length === 0) {
        throw new Error("The environment variable NEXTAUTH_SECRET is not set.")
    }

    return secret
}