#define BLYNK_PRINT Serial

/* Fill in information from Blynk Device Info here */
//#define BLYNK_TEMPLATE_ID           "TMPxxxxxx"
//#define BLYNK_TEMPLATE_NAME         "Device"
//#define BLYNK_AUTH_TOKEN            "YourAuthToken"

#define BLYNK_TEMPLATE_ID "TMPL23CFdzVup"
#define BLYNK_TEMPLATE_NAME "TurmaBIoT"
#define BLYNK_AUTH_TOKEN "Tv6r_toJH4l2hvSORFD_6Nu6wybaOodA" 


#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "iotsenai123";
char pass[] = "iotsenai123";

unsigned long ultimotempopot;

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop()
{
  float valorpot = analogRead(34);
  if ((millis()- ultimotempopot)>5000){
  Blynk.virtualWrite(V27,valorpot);
  ultimotempopot = millis();
}
  Blynk.run();
}
