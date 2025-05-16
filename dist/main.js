"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const gloabal_interceptor_1 = require("./interceptors/gloabal.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
    }));
    app.useGlobalInterceptors(new gloabal_interceptor_1.GlobaIntereptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Solar panels crud!')
        .setDescription('This is just simple solar panels crud!')
        .addBearerAuth()
        .setVersion('1.0.0')
        .build();
    const documentFactory = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map