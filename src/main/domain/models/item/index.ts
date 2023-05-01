export interface ItemDTO {
    id?: string;
    userId?: string;
    projectId?: string;
    usersStoryId?: string;
    name: string;
    description: string;
    priorityId?: number;
    phaseId?: number;
    estimatedTime: number;
    actualTime: number;
    statusId?: number;
    startedAt?: string;
    completedAt?: string;
    createdAt?: string;
}