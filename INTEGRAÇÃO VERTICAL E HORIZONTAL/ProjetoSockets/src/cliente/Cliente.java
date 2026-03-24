package cliente;

import java.io.IOException;
import java.net.InetAddress;
import java.util.*;
import canal.Canal;

public class Cliente {
    private InetAddress enderecoServidor;
    private int portaServidor;
    private int portaCliente;
    private Canal canal;

    public Cliente(String ipServidor, int portaServidor, int portaCliente) throws Exception {
        this.enderecoServidor = InetAddress.getByName(ipServidor.isEmpty() ? "127.0.0.1" : ipServidor);
        this.portaServidor = portaServidor;
        this.portaCliente = portaCliente;
        this.canal = new Canal(portaCliente);
    }

    public void enviarMensagens(int numeroMensagens, boolean paralelo, int latenciaMs) {
        List<Thread> threads = new ArrayList<>();

        for (int i = 0; i < numeroMensagens; i++) {
            final String mensagem = "Mensagem " + i;
            final int index = i; // Necessário para o cálculo de latência no modo paralelo

            Runnable task = () -> {
                try {
                    // Se for paralelo, escalonamos o início de cada thread
                    if (paralelo && latenciaMs > 0) {
                        Thread.sleep((long) index * latenciaMs); //Função pra adionar a latência entre mensagens
                    }

                    canal.enviar(mensagem, enderecoServidor, portaServidor);
                    System.out.println("Enviada: " + mensagem);
                } catch (IOException e) {
                    System.err.println("Erro ao enviar: " + e.getMessage());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            };

            if (paralelo) {
                Thread thread = new Thread(task);
                threads.add(thread);
                thread.start();
            } else {
                task.run();
                // Se for sequencial, espera antes da próxima iteração do loop
                if (latenciaMs > 0 && i < numeroMensagens - 1) {
                    try {
                        Thread.sleep(latenciaMs); // Função para adionar a latência em enviar as mensagens
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }

        if (paralelo) {
            for (Thread thread : threads) {
                try {
                    thread.join();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        canal.exibirEstatisticas();
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Informe o IP do Servidor (Enter para 127.0.0.1):");
            String ipServidor = scanner.nextLine();

            System.out.println("Informe a porta do Servidor:");
            int portaServidor = scanner.nextInt();

            System.out.println("Informe a porta do Cliente:");
            int portaCliente = scanner.nextInt();

            Cliente cliente = new Cliente(ipServidor, portaServidor, portaCliente);

            System.out.println("Informe o número de mensagens a enviar:");
            int numeroMensagens = scanner.nextInt();

            // NOVA VARIÁVEL: Pergunta a latência desejada
            System.out.println("Informe a latência entre as mensagens (em milissegundos):");
            int latencia = scanner.nextInt();

            System.out.println("Enviar de forma sequencial (S) ou paralela (P)?");
            String modoEnvio = scanner.next();
            boolean paralelo = modoEnvio.equalsIgnoreCase("P");

            // Passa a latência para o método de envio
            cliente.enviarMensagens(numeroMensagens, paralelo, latencia);

        } catch (Exception e) {
            System.err.println("Erro ao iniciar o cliente: " + e.getMessage());
            e.printStackTrace();
        }
    }
}