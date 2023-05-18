import { CreateItemUseCase } from "../../../domain/usecases/create-item";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";

export function createItemAdapter(): Fn {
    return async (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {
            const output = await new CreateItemUseCase(logger).execute({
                description: event.body.description,
                name: event.body.name,
                startedAt: event.body.startedAt || "",
                completedAt: event.body.completedAt || "",
                statusId: event.body.statusId,
                projectId: event.body.projectId,
                usersStoryId: event.body.usersStoryId,
                programmingLanguages: event.body.programmingLanguages,
                technologies: event.body.technologies,
                actualTime: Number(event.body.actualTime),
                estimatedTime: Number(event.body.estimatedTime),
                phaseId: Number(event.body.phaseId),
                priorityId: Number(event.body.priorityId),
            }, options);
            return {
                "headers": {},
                "body": output,
                "statusCode": 200,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
