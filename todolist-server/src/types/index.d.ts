export {};

declare module 'express-session' {
    interface SessionData {
        userId:string
        userTest:string
    }
}