<div>
    <div class="flex h-[550px] text-sm border rounded-xl shadow overflow-hidden bg-gray-300">
        <button
            onclick="window.parent.document.elementFromPoint(10, 10).click()"
            class="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-gray-400 transition-colors duration-200 group"
            aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="w-1/4 border-r bg-gray-300">
            <div class="p-4 font-bold text-gray-900 border-b border-gray-400">Usuarios</div>

            <div class="divide-y divide-gray-400">
                @forelse ($users as $user)

                    <div wire:click="selectUser({{ $user->id }})"
                         class="p-3 cursor-pointer hover:bg-blue-200 transition
                                 {{ $selectedUser && $selectedUser->id === $user->id ? 'bg-blue-200 font-semibold text-gray-900' : 'text-gray-800'}}">
                        <div>{{ $user->name }}</div>
                        <div class="text-xs text-gray-700">{{ $user->email }}</div>
                    </div>
                @empty
                    {{-- Si no hay usuarios para chatear --}}
                    <div class="p-3 text-gray-700 italic">No hay conversaciones disponibles.</div>
                @endforelse
            </div>
        </div>

        <div class="w-3/4 flex flex-col">
            <div class="p-4 border-b bg-gray-300 border-gray-400 flex items-center gap-3">
              
                @if ($selectedUser) 
                    <div>

                        <div class="text-lg font-semibold text-gray-900">{{ $selectedUser->name }}</div>
                       
                        <div class="text-xs text-gray-700">{{ $selectedUser->email }}</div>
                    </div>
                @else
                    {{-- Contenido del encabezado si no hay usuario seleccionado --}}
                    <div>
                        <div class="text-lg font-semibold text-gray-900">No hay chats seleccionados</div>
                        <div class="text-xs text-gray-700">Selecciona un chat de la lista izquierda para empezar.</div>
                    </div>
                @endif
            </div>

            <div class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-300">
                @if ($selectedUser) {{-- Solo muestra los mensajes si hay un usuario seleccionado --}}
                    @foreach ($messages as $message)
                        <div class="flex {{ $message->sender_id === auth()->id() ? 'justify-end' : 'justify-start' }}">
               
                        <div class="max-w-xs px-4 py-2 rounded-2xl shadow
                                    {{ $message->sender_id === auth()->id()
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-400 text-gray-900' }}">
                                {{ $message->message ?? $message->content }}
                            </div>
                        </div>
                    @endforeach
                @else
                    {{-- Mensaje cuando no hay chats o no hay uno seleccionado --}}
                    <div class="h-full flex items-center justify-center text-center text-gray-600 dark:text-gray-400">
                        <div>
                            <p class="text-xl font-bold mb-2">¡Bienvenido al chat!</p>
                            <p class="text-lg">Selecciona una conversación de la lista izquierda para empezar a chatear.</p>
                            <p class="text-md mt-4">Asegúrate de haber completado tu perfil antes.</p>
                        </div>
                    </div>
                @endif
            </div>

            @if ($selectedUser) {{-- solo muestra el input si hay un usuario seleccionado --}}
                <form wire:submit="submit" class="p-4 border-t bg-gray-300 border-gray-400 flex items-center gap-2">
                    <input
                        wire:model="newMessage"
                        type="text"
                        class="flex-1 border border-gray-500 rounded-full px-4 py-2 text-sm text-gray-900 bg-gray-300 focus:outline-none"
                        placeholder="Escribe tu mensaje..."
                    />
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition">
                        Enviar
                    </button>
                </form>
            @endif
        </div>
    </div>
</div>