type EmailsType = { value: string, type: string };

export type GoogleProfile = {  id: string, displayName: string, emails: EmailsType[] };

export type User = { id: number, googleId: string, displayName: string };

export type DoneFunction = (error: Error | null, user?: User | null) => void;
