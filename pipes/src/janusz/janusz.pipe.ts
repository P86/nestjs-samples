import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

//example of custom pipe that allows only to use Janusz as a name :)
@Injectable()
export class JanuszPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== 'Janusz') {
      throw new BadRequestException('Name must be Janusz');
    }

    return value;
  }
}
