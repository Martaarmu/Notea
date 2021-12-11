package com.marjmun.Notea;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.capacitorjs.plugins.storage.StoragePlugin;
import com.getcapacitor.community.speechrecognition.SpeechRecognition;


public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //Aquí los plugin no oficiales
        registerPlugin(GoogleAuth.class);
        registerPlugin(StoragePlugin.class);
        registerPlugin(SpeechRecognition.class);
      
    }
}
