export interface RecordType {
    key: string;
    title: string;
    description: string;
}

export const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `Actividad${i + 1}`,
    description: `description of content${i + 1}`,
}));