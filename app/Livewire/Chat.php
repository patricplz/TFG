<?php

namespace App\Livewire;

use App\Models\ChatMessage;
use App\Models\User;
use Auth;
use Livewire\Component;

class Chat extends Component
{
    public $users; //almacena la lista de usuarios con los que el usuario autenticado ha tenido conversaciones
    public $selectedUser; //usuario que está seleccionado para ver el chat
    public $newMessage; //mensaje a enviar
    public $messages; //colección de mensajes del chat actual

    //función que se carga al iniciar el componente, carga los usuarios con los que el usuario autenticado ha chateado, selecciona un usuario inicial (por ID de URL al enviar un mensaje desde el perfil de un alumno, o el primero de la lista), y carga sus mensajes.
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

// obtiene y actualiza la colección de mensajes entre el usuario autenticado y el $selectedUser actual
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

//envía un nuevo mensaje
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

//Cambia el usuario seleccionado por su ID, y luego carga los mensajes correspondientes a la nueva conversación
public function selectUser($id){
    $this->selectedUser = User::find($id);
    $this->loadMessages(); 
}

// Renderiza la vista de Blade 
    public function render()
    {
        return view('livewire.chat');
    }
}
