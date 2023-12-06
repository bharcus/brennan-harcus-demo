export default function MealHeader({ title, img }) {
  return (
    <div id="title">
      <img src={img} />
      <h1>{title}</h1>
    </div>
  );
}
