<?php

namespace App\Livewire;

use App\Models\ChatMessage;
use App\Models\User;
use Auth;
use Livewire\Component;

class Chat extends Component
{
    public $users;
    public $selectedUser;
    public $newMessage;
    public $messages;

    public function mount()
{
    $authUserId = Auth::id();

    // Obtener los IDs de usuarios con los que se ha intercambiado mensajes
    $userIds = ChatMessage::where('sender_id', $authUserId)
                ->orWhere('receiver_id', $authUserId)
                ->get()
                ->flatMap(function ($message) use ($authUserId) {
                    return [
                        $message->sender_id == $authUserId ? $message->receiver_id : $message->sender_id
                    ];
                })
                ->unique()
                ->values();

    $this->users = User::whereIn('id', $userIds)->get();
    $userId = request()->query('user');

    if ($userId) {
        $this->selectedUser = $this->users->firstWhere('id', $userId);
        if (!$this->selectedUser) {
            $user = User::find($userId);
            if ($user) {
                $this->users->push($user);
                $this->selectedUser = $user;
            }
        }
    } else {
        $this->selectedUser = $this->users->first();
    }

    if ($this->selectedUser) {
        $this->loadMessages();
    } else {
        $this->messages = collect();
    }
}

private function loadMessages(){
    $this->messages = ChatMessage::query()
        ->where(function($q){
            $q->where("sender_id", Auth::id())
                ->where("receiver_id", $this->selectedUser->id);
        })
        ->orWhere(function($q){
            $q->where("receiver_id", Auth::id())
                ->where("sender_id", $this->selectedUser->id);
        })
        ->orderBy('created_at', 'asc') 
        ->get();
}

public function submit(){
    if (!$this->newMessage) return;

    $message = ChatMessage::create([
        "sender_id" => Auth::id(),
        "receiver_id" => $this->selectedUser->id,
        "message" => $this->newMessage
    ]);

    $this->loadMessages();
    
    $this->newMessage = '';
}

public function selectUser($id){
    $this->selectedUser = User::find($id);
    $this->loadMessages(); 
}

    public function render()
    {
        return view('livewire.chat');
    }
}
