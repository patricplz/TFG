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

    public function mount(){
        $this->users = User::whereNot("id", Auth::id())->get();
        $this->selectedUser = $this->users->first();
        //todo: cambiar solo a los que tenga chat con el, no todos los usuarios
    }

    public function submit(){
        if (!$this->newMessage) return;

        ChatMessage::create([
            "sender_id" => Auth::id(),
            "receiver_id" => $this->selectedUser->id,
            "message" => $this->newMessage
        ]);

        $this->newMessage = '';
    }

    public function selectUser($id){
        $this->selectedUser = User::find($id);
    }

    public function render()
    {
        return view('livewire.chat');
    }
}
