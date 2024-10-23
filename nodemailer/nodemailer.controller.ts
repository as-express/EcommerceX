import { Body, Controller, Get, Post } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
    constructor(private readonly nodemailerService: NodemailerService) {}
}
