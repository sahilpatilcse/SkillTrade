export default function HomeComponent({icon, heading, text}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:scale-105 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{heading}</h3>
      <p className="text-gray-600"> {text} </p>
    </div>
  );
}
