import "./BulletinBoardPage.css";
import RecentTasksWidget from "../components/widgets/RecentTasksWidget";
import PriorityGroceryWidget from "../components/widgets/PriorityGroceryWidget";
import ContributionsWidget from "../components/widgets/ContributionsWidget";
export default function BulletinBoardPage(props) {
   const { tasks, groceries, users } = props;
  return (
    <div className="bulletin-board">
      <div className="bb-grid">
        <div className="bb-column">
          <RecentTasksWidget tasks={tasks} users={users} />
          <PriorityGroceryWidget groceries={groceries} users={users} />
        </div>
        <div className="bb-column">
          <ContributionsWidget
            tasks={tasks}
            groceries={groceries}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}