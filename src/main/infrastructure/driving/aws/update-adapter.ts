import { UpdateItemUseCase } from "../../../domain/usecases/update-item";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";

export function updateItemAdapter(): Fn {
    return async (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {
            const output = await new UpdateItemUseCase(logger).execute(event.params.id, {
                description: event.body.description,
                name: event.body.name,
                statusId: Number(event.body.statusId),
                startedAt: event.body.startedAt || "",
                completedAt: event.body.completedAt || "",
                actualTime: Number(event.body.actualTime),
                estimatedTime: Number(event.body.estimatedTime),
                phaseId: Number(event.body.phaseId),
                priorityId: Number(event.body.priorityId),
                programmingLanguages: event.body.programmingLanguages,
                technologies: event.body.priorityId,
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
