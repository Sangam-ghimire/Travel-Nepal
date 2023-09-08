// Desc: This file contains functions to get secrets from the environment.
export const getAuthSecret = (): string => {
    // Get the secret from the environment.
    const secret = process.env.NEXTAUTH_SECRET

    // If the secret is not set, throw an error.
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable NEXTAUTH_SECRET is not set.")
    }
    // Return the secret.
    return secret
}