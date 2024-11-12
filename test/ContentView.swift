//
//  ContentView.swift
//  test
//
//  Created by miheon son on 11/12/24.
//

import SwiftUI

struct ContentView: View {
    @Binding var document: testDocument

    var body: some View {
        TextEditor(text: $document.text)
    }
}

#Preview {
    ContentView(document: .constant(testDocument()))
}
