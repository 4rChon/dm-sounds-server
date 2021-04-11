import YTDLService from "../../services/ytdl.service"
import YTPLService from "../../services/ytpl.service"

export default class Validators {
  static Colour = {
    validator: (hex: string) => (/^#([0-9a-f]{3}){1,2}$/i).test(hex),
    message: (v: any) => `${v.value} is not a valid hex colour`
  }

  static SongID = {
    validator: (id: string) => YTDLService.validateID(id),
    message: (v: any) => `${v.value} is not a valid song ID`
  }

  static PlaylistID = {
    validator: (id: string) => YTPLService.validateID(id),
    message: (v: any) => `${v.value} is not a valid playlist ID`
  }
}