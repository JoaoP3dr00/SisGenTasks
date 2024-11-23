"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const apiPath = 'api';
    app.setGlobalPrefix(apiPath);
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Sistema de Gerenciamento de Tasks API')
        .setDescription('API que oferece endpoints para um sistema de gerenciamento de tasks, criada com NestJS, utiliza um banco de dados PostgreSQL, ambos em containers Docker.')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(`${apiPath}/docs`, app, document);
    await app.listen(process.env.PORT ?? 2504);
}
bootstrap();
//# sourceMappingURL=main.js.map