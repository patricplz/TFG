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

    public function mount(){
    $this->users = User::whereNot("id", Auth::id())->get();
    $this->selectedUser = $this->users->first();
    $this->loadMessages();
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
        ->orderBy('created_at', 'asc') // Cambiar a ASC para orden cronológico
        ->get();
}

public function submit(){
    if (!$this->newMessage) return;

    $message = ChatMessage::create([
        "sender_id" => Auth::id(),
        "receiver_id" => $this->selectedUser->id,
        "message" => $this->newMessage
    ]);

    // Opción 1: Recargar todos los mensajes
    $this->loadMessages();
    
    // Opción 2: Solo añadir el nuevo mensaje al final
    // $this->messages->push($message);
    
    $this->newMessage = '';
}

public function selectUser($id){
    $this->selectedUser = User::find($id);
    $this->loadMessages(); // Cargar mensajes del usuario seleccionado
}

    public function render()
    {
        return view('livewire.chat');
    }
}
