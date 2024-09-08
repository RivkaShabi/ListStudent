export class Validator {
    static validateIsraeliID(id: string): boolean {
      const cleanId = id.trim().padStart(9, '0');
        if (cleanId.length !== 9 || !/^\d+$/.test(cleanId)) {
        return false;
      }
  
      let sum = 0;
  
      for (let i = 0; i < 9; i++) {
        let num = Number(cleanId[i]) * (i % 2 === 0 ? 1 : 2);
        if (num > 9) {
          num -= 9; 
        }
        sum += num;
      }
  
      return sum % 10 === 0;
    }
    static isValidEmail(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
    
  }
  