export default class Validators {
  static Colour = {
    validator: (v: string) => (/^#([0-9a-f]{3}){1,2}$/i).test(v),
    message: (v: any) => `${v.value} is not a valid hex colour`
  }
}