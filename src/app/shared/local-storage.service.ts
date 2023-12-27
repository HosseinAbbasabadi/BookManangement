import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(name: string): string {
    const result = localStorage.getItem(name)
    if (result) return result
    return ''
  }

  setItem(name: string, value: string): void {
    if (this.exists(name))
      this.removeItem(name)

    localStorage.setItem(name, value)
  }

  exists(name: string): boolean {
    if (this.getItem(name) == null)
      return false
    return true
  }

  removeItem(name: string): void {
    localStorage.removeItem(name)
  }
}
