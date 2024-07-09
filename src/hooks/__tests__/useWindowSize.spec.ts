import { describe, it, expect, afterEach } from 'vitest'
import useWindowSize from '../useWindowSize'
import {withSetup} from '../../utils/test-utils'
import { nextTick } from 'vue'

describe("useWindowSize", () => {
    let  resizeWindow = (x:number , y:number) => {
        window.innerWidth = x;
        window.innerHeight = y;
        window.dispatchEvent(new Event('resize'));
    }
    afterEach(() => {
        resizeWindow(1024, 768);
    })
    it("should return window size", () => {
        resizeWindow(1024, 600);
        const { width, height } = useWindowSize();
        expect(width.value).toBe(1024);
        expect(height.value).toBe(600);
    })
    it("should update window size", async () => {
        resizeWindow(800, 600);
        const [result] = withSetup(() => useWindowSize());
        await nextTick();
        resizeWindow(1024, 728);
        const { width, height } = result;
        expect(width.value).toBe(1024);
        expect(height.value).toBe(728);
    })
})