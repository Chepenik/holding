// types.d.ts
declare module 'sqlite' {
    import { Database, open } from 'sqlite';
    export { open, Database };
}
