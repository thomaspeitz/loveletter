export type ChoiceFirstToThird = {
  id: number;
  text: string;
};

export type Person = {
  firstName: string;
  lastName: string;
  gender: "M" | "F" | "N";
};

export type Remark = {
  text: string;
  checked: boolean;
  grade?: number;
};

export type Comment = {
  creator: string;
  comment: string;
  checked: boolean;
};

export type SchoolCertificateThird = {
  version: number;
  person: Person;
  class: string;
  comments: Comment[];
  missingHours: Number;
  unexecusedHours: Number;
  remarksMale: Remark[];
  remarksFemale: Remark[];
  birthday: string;
  subjects: SubjectData[];
};

export type Choice = {
  selected: number;
  choices: ChoiceFirstToThird[];
  weight: 1 | 2 | 3;
};

export type ComplexText = {
  // Used for multi section grades
  heading?: string;
  gradeWeight?: number;
  //
  femaleText: string;
  maleText: string;
  choices: Choice[];
  renderedText: string;
  editedText: string;
};

export type SubjectData = {
  name: string;
  description: string;
  version: number;
  showGrade: boolean;
  texts: ComplexText[];
  enabled: boolean;
};
