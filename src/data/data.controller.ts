import {
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Body,
} from '@nestjs/common';

class DataDto {
  readonly integer: number;
  readonly text: string;
}

@Controller('data')
export class DataController {
  @Post()
  createData(@Body() data: DataDto): string {
    const uniqueId = generateUniqueId();
    storeData(uniqueId, data);
    return uniqueId;
  }

  @Get(':uniqueId')
  getDataById(@Param('uniqueId') uniqueId: string) {
    const data = getData(uniqueId);
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    return data;
  }

  @Get()
  getAllData() {
    const allData = Array.from(dataStore.entries()).map(([uniqueId, data]) => ({
      uniqueId,
      data,
    }));
    if (allData.length === 0) {
      throw new NotFoundException('No data found');
    }
    return allData;
  }
}

const dataStore = new Map<string, DataDto>();
let nextUniqueId = 1;

function generateUniqueId(): string {
  return (nextUniqueId++).toString();
}

function storeData(uniqueId: string, data: DataDto): void {
  dataStore.set(uniqueId, data);
}

function getData(uniqueId: string): DataDto | undefined {
  return dataStore.get(uniqueId);
}
