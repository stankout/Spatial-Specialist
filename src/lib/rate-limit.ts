const attempts = new Map<string,{count:number;reset:number}>();
export interface RateLimitAdapter { check(key:string):Promise<boolean> }
export const memoryRateLimit:RateLimitAdapter={async check(key){const now=Date.now();const current=attempts.get(key);if(!current||current.reset<now){attempts.set(key,{count:1,reset:now+60_000});return true}if(current.count>=5)return false;current.count++;return true}};
