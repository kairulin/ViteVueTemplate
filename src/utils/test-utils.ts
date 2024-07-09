import { createApp } from 'vue'

export function withSetup(composable: any) {
    console.log('composable', composable)
    let result:any;
    const app = createApp({
        setup() {
            result = composable();
            return () => result;
        }
    })
    app.mount(document.createElement('div'))
    return [result, app]
}