import { InjectionToken, signal } from "@angular/core";

export const SCREEN_SIZES = new InjectionToken('SCREEN_SIZES', {
  factory: () => {
    const width = signal(window.innerWidth);
    const height = signal(window.innerHeight);
    window.addEventListener('resize', ()=>{
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    })
    return {
      width,
      height,
    }
  }
})
