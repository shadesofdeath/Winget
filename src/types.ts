export interface Package {
  Id: string;
  Versions: string[];
  Latest: {
    Name: string;
    Publisher: string;
    Tags: string[];
    Description?: string;
    Homepage?: string;
    License?: string;
    LicenseUrl?: string;
  };
  Featured: boolean;
  IconUrl?: string;
  Banner?: string;
  Logo?: string;
  UpdatedAt: Date;
  CreatedAt: Date;
}