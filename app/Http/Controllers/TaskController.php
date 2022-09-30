<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        if ($request->all) {
            $tasks = Task::latest()->get();
        } else {
            $tasks = Task::whereStatus(0)->latest()->get();
        }

        return response()->json(['success' => true, 'tasks' => $tasks]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:tasks,project_name'

        ]);
        $tasks = Task::create(
            [
                'project_name' => $request->name,
            ]
        );

        return  response()->json(['success' => true, 'tasks' => $tasks, 'message' => 'Task Added Succesfully']);
    }
    public function destroy($id)
    {
        Task::findOrfail($id)->delete();
        return  response()->json(['success' => true, 'message' => 'Task Deleted Succesfully']);
    }
    public function complete(Request $request)
    {


        $task = Task::findOrfail($request->id);
        $task->status = 1;
        $task->save();


        return  response()->json(['success' => true, 'message' => 'Task Completed ']);
    }
}
