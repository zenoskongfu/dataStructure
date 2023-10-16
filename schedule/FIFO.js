// 调度器
// 执行器
// 轮询检查
// 先进先出
/**  到达时间 执行时间 等待时间 已经执行的时间 剩余时间
 *
 * A
 * B
 * C
 * D
 *
 * 每过一秒钟，就检查任务是否执行完成，检查是否有新进程的到来，
 * 如果任务执行完成，就将任务从队列中删除，并且从队头中中获取新的进程，设置为执行态。
 * 如果有新的进程到来，将任务放进就绪队列中，放到队尾并且开始下一个
 *
 * 调度者，执行者，检查者
 */

class Task {
	name = "";
	arrivalTime = 0;
	totalTime = 0;
	executeTime = 0;
	waitTime = 0;
	leftTime = 0;

	constructor(arrivalTime, totalTime, name) {
		this.arrivalTime = arrivalTime;
		this.totalTime = totalTime;
		this.leftTime = this.totalTime;
		this.name = name || "Task" + Math.random();
	}

	execute() {
		console.log(this.name, " working...  left time is ", --this.leftTime);
		this.executeTime++;
		if (this.leftTime == 0) {
			console.log(this.name, " has finished. ");
		}
	}
}

/**
 * 从表格中读取数据
 */

class schedule {
	time = 0;
	executeTask = null;
	waitTaskQueue = [];
	pendingTaskQueue = [];
	finishTask = [];
	/** @type {Executer} */
	executer = null;
	id = null;
	lastTaskIndex = 0;
	/**
	 *
	 * @param {Task[]} taskInfo
	 */
	constructor(taskInfo) {
		this.taskInfo = taskInfo;
		this.executer = new Executer(this);
	}

	addTask(task) {
		this.waitTaskQueue.push(task);
	}

	startSchedule() {
		this.id = setInterval(() => {
			this.execute();
			this.time++;
		}, 1000);
	}

	execute() {
		//判断是否还有任务进来
		this.judgeNewTask();

		//判断任务是否执行完成
		if (this.executeTask == null && this.waitTaskQueue.length == 0 && this.taskInfo.length == 0) {
			clearInterval(this.id);
			return;
		}

		//判断当前任务是否执行完成，如果执行完成，就上新任务，如果没有，就跳过
		this.SRTN();
		if (this.executeTask) this.executer.execute();
	}

	FIFO() {
		if (this.executeTask !== null) return;
		if (this.waitTaskQueue.length) this.executeTask = this.waitTaskQueue.shift();
	}

	SJF() {
		if (this.executeTask !== null) return;
		if (this.waitTaskQueue.length) {
			let index = 0;

			for (let i in this.waitTaskQueue) {
				if (this.waitTaskQueue[index].totalTime > this.waitTaskQueue[i].totalTime) {
					index = i;
				}
			}

			this.executeTask = this.waitTaskQueue[index];
			this.waitTaskQueue.splice(index, 1);
		}
	}

	SRTN() {
		if (this.waitTaskQueue.length) {
			let index = 0;

			for (let i in this.waitTaskQueue) {
				if (this.waitTaskQueue[index].leftTime > this.waitTaskQueue[i].leftTime) {
					index = i;
				}
			}

			if (this.executeTask !== null && this.executeTask.leftTime > this.waitTaskQueue[index].leftTime) {
				const newTask = this.waitTaskQueue[index];
				this.waitTaskQueue.splice(index, 1);
				this.waitTaskQueue.push(this.executeTask);
				this.executeTask = newTask;
			}
			if (this.executeTask == null) {
				const newTask = this.waitTaskQueue[index];
				this.waitTaskQueue.splice(index, 1);
				this.executeTask = newTask;
			}
		}
	}

	judgeNewTask() {
		let addedTaskIndex = [];
		for (let i = 0; i < this.taskInfo.length; i++) {
			if (this.taskInfo[i].arrivalTime <= this.time) {
				const { arrivalTime, totalTime, name } = this.taskInfo[i];
				this.addTask(new Task(arrivalTime, totalTime, name));
				addedTaskIndex.push(i);
				this.lastTaskIndex++;
			} else {
				break;
			}
		}
		addedTaskIndex.forEach((item) => {
			this.taskInfo.splice(item, 1);
		});
	}
}

/**
 * 执行任务
 * 从executeTask中获取任务
 */
class Executer {
	/** @type {schedule} */
	schedule = null;
	constructor(schedule) {
		this.schedule = schedule;
	}

	execute() {
		// this.recordInfo();

		this.schedule.executeTask.execute();
		// 检查任务是否执行完成，如果完成就将任务删除
		if (this.schedule.executeTask.leftTime == 0) {
			this.schedule.finishTask.push(this.schedule.executeTask);
			this.schedule.executeTask = null;
		}
	}

	recordInfo() {
		const now = this.schedule.time;
		this.schedule.waitTaskQueue.forEach((item) => {
			item.waitTime = now - item.arrivalTime;
		});
		const printTask = (task) => {
			return task
				.map(
					(item) =>
						`${item.name}, arrivalTime: ${item.arrivalTime}, totalTime: ${item.totalTime}, waitTime: ${item.waitTime};`
				)
				.join("\n");
		};
		console.log(`finished task: \n${printTask(this.schedule.finishTask)}\nwait tasks: \n${printTask(
			this.schedule.waitTaskQueue
		)}
		`);
	}
}

const taskInfo = [
	{ name: "A", arrivalTime: 0, totalTime: 3 },
	{ name: "B", arrivalTime: 1, totalTime: 1 },
	{ name: "C", arrivalTime: 3, totalTime: 3 },
	{ name: "D", arrivalTime: 5, totalTime: 1 },
];

new schedule(taskInfo).startSchedule();
