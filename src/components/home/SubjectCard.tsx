// components/SubjectCard.tsx
type SubjectCardProps = {
  name: string;
  description: string;
  teachers: string[];
};

export default function SubjectCard({ name, description, teachers }: SubjectCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold text-center">{name}</h2>
      <p className="text-gray-600 text-sm text-center mt-2">{description}</p>
      <div className="mt-4">
        <h3 className="font-medium text-gray-800 text-sm mb-1">Profesores:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {teachers.map((teacher, index) => (
            <li key={index}>{teacher}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
