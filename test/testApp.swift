//
//  testApp.swift
//  test
//
//  Created by miheon son on 11/12/24.
//

import SwiftUI

@main
struct testApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: testDocument()) { file in
            ContentView(document: file.$document)
        }
    }
}
