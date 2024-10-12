// global.d.ts
export {} // 确保这是一个模块

declare global {
  interface Window {
    _AMapSecurityConfig?: any; // 根据需要调整类型
  }
}