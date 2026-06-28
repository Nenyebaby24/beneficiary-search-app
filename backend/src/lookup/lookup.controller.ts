import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { LookupService } from "./lookup.service";

@Controller("lookup")
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get("schemes")
  getSchemes() {
    return this.lookupService.getSchemes();
  }

  @Get("states")
  getStates() {
    return this.lookupService.getStates();
  }

  @Get("subschemes")
  getSubSchemes() {
    return this.lookupService.getSubSchemes();
  }

  @Get("districts/:stateId")
  getDistricts(
    @Param("stateId", ParseIntPipe)
    stateId: number,
  ) {
    return this.lookupService.getDistricts(stateId);
  }
}