export default function Stats({items}) {
    if (items.length === 0){
      return (
        <footer className='stats'>
          <em>Start adding some items to your packing list 🚀</em>
        </footer>
      );
    }
  
    const numItems = items.length;
    const numItemsPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numItemsPacked / numItems) * 100);
  
    return (
      <footer className='stats'>
        <em>
          {percentage === 100 ? "You've got everything! Ready to go ✈️" : `🧳 You have ${numItems} items on your list, and you already packed ${numItemsPacked} (${percentage}%)`}
        </em>
      </footer>
    );
  }