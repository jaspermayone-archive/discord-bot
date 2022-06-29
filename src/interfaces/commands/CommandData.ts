export interface CommandData {
  id: string;
  application_id: string;
  name: string;
  description: string;
  version: string;
  default_permission: boolean;
  type?: number;
  options?: [
    {
      type: number;
      name: string;
      description: string;
      options: [
        {
          type: number;
          name: string;
          description: string;
          required: boolean;
        }
      ];
    }
  ];
}
