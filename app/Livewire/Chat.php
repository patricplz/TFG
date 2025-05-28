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

    public function mount($userId = null)
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

    // Traer usuarios basados en esos IDs
    $this->users = User::whereIn('id', $userIds)->get();

    if ($userId) {
        $this->selectedUser = $this->users->firstWhere('id', $userId);
        if (!$this->selectedUser) {
            // Si no está en la lista, búscalo directamente y agrégalo
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
        $this->messages = collect(); // vacío
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
