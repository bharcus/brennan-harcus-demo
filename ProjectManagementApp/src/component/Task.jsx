export default function Task({taskId, taskName, taskRemover}) {
  return (
    <>
      <li className="flex justify-between my-4">
        <p className="text-stone-800 my-4">{taskName}</p>
        <button onClick={() => taskRemover(taskId)} className="text-stone-700 hover:text-red-500">Clear</button>
      </li>
    </>
  );
}
